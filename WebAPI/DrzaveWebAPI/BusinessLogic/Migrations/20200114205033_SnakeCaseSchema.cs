using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class SnakeCaseSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gradovi_Drzave_DrzavaId",
                table: "Gradovi");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Gradovi",
                table: "Gradovi");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Drzave",
                table: "Drzave");

            migrationBuilder.RenameTable(
                name: "Gradovi",
                newName: "gradovi");

            migrationBuilder.RenameTable(
                name: "Drzave",
                newName: "drzave");

            migrationBuilder.RenameColumn(
                name: "Populacija",
                table: "gradovi",
                newName: "populacija");

            migrationBuilder.RenameColumn(
                name: "Ime",
                table: "gradovi",
                newName: "ime");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "gradovi",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "DrzavaId",
                table: "gradovi",
                newName: "drzava_id");

            migrationBuilder.RenameIndex(
                name: "IX_Gradovi_DrzavaId",
                table: "gradovi",
                newName: "ix_gradovi_drzava_id");

            migrationBuilder.RenameColumn(
                name: "Ime",
                table: "drzave",
                newName: "ime");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "drzave",
                newName: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_gradovi",
                table: "gradovi",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_drzave",
                table: "drzave",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_gradovi_drzave_drzava_id",
                table: "gradovi",
                column: "drzava_id",
                principalTable: "drzave",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_gradovi_drzave_drzava_id",
                table: "gradovi");

            migrationBuilder.DropPrimaryKey(
                name: "pk_gradovi",
                table: "gradovi");

            migrationBuilder.DropPrimaryKey(
                name: "pk_drzave",
                table: "drzave");

            migrationBuilder.RenameTable(
                name: "gradovi",
                newName: "Gradovi");

            migrationBuilder.RenameTable(
                name: "drzave",
                newName: "Drzave");

            migrationBuilder.RenameColumn(
                name: "populacija",
                table: "Gradovi",
                newName: "Populacija");

            migrationBuilder.RenameColumn(
                name: "ime",
                table: "Gradovi",
                newName: "Ime");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Gradovi",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "drzava_id",
                table: "Gradovi",
                newName: "DrzavaId");

            migrationBuilder.RenameIndex(
                name: "ix_gradovi_drzava_id",
                table: "Gradovi",
                newName: "IX_Gradovi_DrzavaId");

            migrationBuilder.RenameColumn(
                name: "ime",
                table: "Drzave",
                newName: "Ime");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Drzave",
                newName: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Gradovi",
                table: "Gradovi",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Drzave",
                table: "Drzave",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Gradovi_Drzave_DrzavaId",
                table: "Gradovi",
                column: "DrzavaId",
                principalTable: "Drzave",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
