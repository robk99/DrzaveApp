using Microsoft.EntityFrameworkCore.Migrations;

namespace DrzaveWebAPI.Migrations
{
    public partial class DodatiRequirediIdentityuModele : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gradovi_Drzave_DrzavaId",
                table: "Gradovi");

            migrationBuilder.AlterColumn<int>(
                name: "Populacija",
                table: "Gradovi",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Ime",
                table: "Gradovi",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DrzavaId",
                table: "Gradovi",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Ime",
                table: "Drzave",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Gradovi_Drzave_DrzavaId",
                table: "Gradovi",
                column: "DrzavaId",
                principalTable: "Drzave",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gradovi_Drzave_DrzavaId",
                table: "Gradovi");

            migrationBuilder.AlterColumn<int>(
                name: "Populacija",
                table: "Gradovi",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Ime",
                table: "Gradovi",
                type: "text",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<int>(
                name: "DrzavaId",
                table: "Gradovi",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Ime",
                table: "Drzave",
                type: "text",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_Gradovi_Drzave_DrzavaId",
                table: "Gradovi",
                column: "DrzavaId",
                principalTable: "Drzave",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
