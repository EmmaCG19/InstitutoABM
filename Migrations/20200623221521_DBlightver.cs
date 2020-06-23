using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IntranetInstituto.Migrations
{
    public partial class DBlightver : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cursos_Profesores_ProfesorId",
                table: "Cursos");

            migrationBuilder.DropTable(
                name: "AlumnosCursos");

            migrationBuilder.DropTable(
                name: "Profesores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cursos",
                table: "Cursos");

            migrationBuilder.DropIndex(
                name: "IX_Cursos_ProfesorId",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "CodCurso",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "ProfesorId",
                table: "Cursos");

            migrationBuilder.AddColumn<int>(
                name: "NroLegajo",
                table: "Cursos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CodMateria",
                table: "Cursos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaFin",
                table: "Cursos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Contacto",
                table: "Alumnos",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cursos",
                table: "Cursos",
                columns: new[] { "NroLegajo", "CodMateria" });

            migrationBuilder.CreateIndex(
                name: "IX_Cursos_CodMateria",
                table: "Cursos",
                column: "CodMateria");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_Cursos_CodMateria",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "NroLegajo",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "CodMateria",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "FechaFin",
                table: "Cursos");

            migrationBuilder.AddColumn<int>(
                name: "CodCurso",
                table: "Cursos",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ProfesorId",
                table: "Cursos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Contacto",
                table: "Alumnos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cursos",
                table: "Cursos",
                column: "CodCurso");

            migrationBuilder.CreateTable(
                name: "AlumnosCursos",
                columns: table => new
                {
                    NroLegajo = table.Column<int>(type: "int", nullable: false),
                    CodCurso = table.Column<int>(type: "int", nullable: false),
                    NotaFinal = table.Column<byte>(type: "tinyint", nullable: false),
                    NotaPrimerParcial = table.Column<byte>(type: "tinyint", nullable: false),
                    NotaSegundoParcial = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlumnosCursos", x => new { x.NroLegajo, x.CodCurso });
                    table.ForeignKey(
                        name: "FK_AlumnosCursos_Cursos_CodCurso",
                        column: x => x.CodCurso,
                        principalTable: "Cursos",
                        principalColumn: "CodCurso",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlumnosCursos_Alumnos_NroLegajo",
                        column: x => x.NroLegajo,
                        principalTable: "Alumnos",
                        principalColumn: "NroLegajo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Profesores",
                columns: table => new
                {
                    ProfesorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Apellido = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CodMateria = table.Column<int>(type: "int", nullable: false),
                    Contacto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaDeNacimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NroDocumento = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profesores", x => x.ProfesorId);
                    table.ForeignKey(
                        name: "FK_Profesores_Materias_CodMateria",
                        column: x => x.CodMateria,
                        principalTable: "Materias",
                        principalColumn: "CodMateria",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cursos_ProfesorId",
                table: "Cursos",
                column: "ProfesorId");

            migrationBuilder.CreateIndex(
                name: "IX_AlumnosCursos_CodCurso",
                table: "AlumnosCursos",
                column: "CodCurso");

            migrationBuilder.CreateIndex(
                name: "IX_Profesores_CodMateria",
                table: "Profesores",
                column: "CodMateria");

            migrationBuilder.AddForeignKey(
                name: "FK_Cursos_Profesores_ProfesorId",
                table: "Cursos",
                column: "ProfesorId",
                principalTable: "Profesores",
                principalColumn: "ProfesorId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
