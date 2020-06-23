using Microsoft.EntityFrameworkCore.Migrations;

namespace IntranetInstituto.Migrations
{
    public partial class SwapInscripcionCursov3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cursos_Materias_CodMateria",
                table: "Cursos");

            migrationBuilder.DropForeignKey(
                name: "FK_Cursos_Alumnos_NroLegajo",
                table: "Cursos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cursos",
                table: "Cursos");

            migrationBuilder.RenameTable(
                name: "Cursos",
                newName: "Inscripciones");

            migrationBuilder.RenameIndex(
                name: "IX_Cursos_CodMateria",
                table: "Inscripciones",
                newName: "IX_Inscripciones_CodMateria");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Inscripciones",
                table: "Inscripciones",
                columns: new[] { "NroLegajo", "CodMateria" });

            migrationBuilder.AddForeignKey(
                name: "FK_Inscripciones_Materias_CodMateria",
                table: "Inscripciones",
                column: "CodMateria",
                principalTable: "Materias",
                principalColumn: "CodMateria",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inscripciones_Alumnos_NroLegajo",
                table: "Inscripciones",
                column: "NroLegajo",
                principalTable: "Alumnos",
                principalColumn: "NroLegajo",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inscripciones_Materias_CodMateria",
                table: "Inscripciones");

            migrationBuilder.DropForeignKey(
                name: "FK_Inscripciones_Alumnos_NroLegajo",
                table: "Inscripciones");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Inscripciones",
                table: "Inscripciones");

            migrationBuilder.RenameTable(
                name: "Inscripciones",
                newName: "Cursos");

            migrationBuilder.RenameIndex(
                name: "IX_Inscripciones_CodMateria",
                table: "Cursos",
                newName: "IX_Cursos_CodMateria");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cursos",
                table: "Cursos",
                columns: new[] { "NroLegajo", "CodMateria" });

            migrationBuilder.AddForeignKey(
                name: "FK_Cursos_Materias_CodMateria",
                table: "Cursos",
                column: "CodMateria",
                principalTable: "Materias",
                principalColumn: "CodMateria",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cursos_Alumnos_NroLegajo",
                table: "Cursos",
                column: "NroLegajo",
                principalTable: "Alumnos",
                principalColumn: "NroLegajo",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
