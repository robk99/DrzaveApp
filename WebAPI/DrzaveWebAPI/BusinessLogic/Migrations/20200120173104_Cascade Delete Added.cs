using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class CascadeDeleteAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_gradovi_drzave_drzava_id",
                table: "gradovi");

            migrationBuilder.AddForeignKey(
                name: "fk_gradovi_drzave_drzava_id",
                table: "gradovi",
                column: "drzava_id",
                principalTable: "drzave",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_gradovi_drzave_drzava_id",
                table: "gradovi");

            migrationBuilder.AddForeignKey(
                name: "fk_gradovi_drzave_drzava_id",
                table: "gradovi",
                column: "drzava_id",
                principalTable: "drzave",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
