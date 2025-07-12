using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.Admin.Orders.Momo {
    public class GetTransactions:IEndpoint {
        public record TransactionDTO(string Id,string OrderId,string TransactionId,string UserName,string Email);
        public record Response(bool Success, List<TransactionDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Transactions", Handler).WithTags("Admin_Transactions");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context, ClaimsPrincipal User) {
            try {

                var Transactions = await context.MomoTransactions
                                                .Include(t => t.Order)
                                                    .ThenInclude(o => o.User)
                                                    .Where(t=>t.IsPaid)
                                                .Select(t => new TransactionDTO(
                                                     t.Id,
                                                     t.OrderId,
                                                     t.TransactionId==null ? "Chưa có":t.TransactionId,
                                                     t.Order.User.UserName,
                                                     t.Order.User.Email
                                                )).ToListAsync();
                    
                return Results.Ok(new Response(true, Transactions, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi server!"));
            }

        }
    }
}
