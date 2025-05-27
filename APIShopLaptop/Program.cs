using APIShopLaptop.Data;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using APIShopLaptop.Middleware.Config;
using APIShopLaptop.Middleware.Email;


using APIShopLaptop.Extension;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
    options => {
        options.CustomSchemaIds(s => s.FullName?.Replace("+", "."));
    }
);
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.WithOrigins("http://localhost:7088")
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials();
        policy.WithOrigins("http://localhost:7089")
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials();
    }); ;
});
builder.Services.Configure<EmailSenderConfig>(builder.Configuration.GetSection("EmailSenderConfig"));
builder.Services.AddOptions();
builder.Services.AddScoped<EmailSender>();
builder.Services.AddAuthorization();
builder.Services.AddDbContext<ApplicationDBContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddIdentity<AppUser, IdentityRole>(option => {
    option.SignIn.RequireConfirmedAccount = true;
    option.Password.RequireUppercase = false;
    option.Password.RequireLowercase = false;
    option.Password.RequireDigit = false;
    option.Password.RequireNonAlphanumeric = false;
    option.Password.RequiredLength = 3;
    option.Password.RequiredUniqueChars = 0;
    option.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    option.Lockout.MaxFailedAccessAttempts = 5;
    option.Lockout.AllowedForNewUsers = true;
    option.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<ApplicationDBContext>()
    .AddTokenProvider<DataProtectorTokenProvider<AppUser>>(TokenOptions.DefaultProvider); ;

builder.Services.AddAuthentication();
builder.Services.ConfigureApplicationCookie(options => {
    options.Cookie.SameSite = SameSiteMode.None;
    options.ExpireTimeSpan = TimeSpan.FromDays(3);
});

builder.Services.AddScoped<IDbInitializer, DbInitializer>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

var scope = app.Services.CreateScope();
var dbInitializer = scope.ServiceProvider.GetRequiredService<IDbInitializer>();
dbInitializer.Initialize();
app.UseCors();

AdminEndpoint.AddAllEndPoint(app);
UserEndpoint.AddAllEndPoint(app);
app.Run();

