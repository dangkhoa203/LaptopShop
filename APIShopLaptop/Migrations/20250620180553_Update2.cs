using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace APIShopLaptop.Migrations
{
    /// <inheritdoc />
    public partial class Update2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComponentName",
                table: "Builds");

            migrationBuilder.AddColumn<string>(
                name: "ComponentName",
                table: "BuildItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComponentName",
                table: "BuildItems");

            migrationBuilder.AddColumn<string>(
                name: "ComponentName",
                table: "Builds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
