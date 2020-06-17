using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IntranetInstituto.Migrations
{
    public partial class MigracionInicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Especialidades",
                columns: table => new
                {
                    CodEspecialidad = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Especialidades", x => x.CodEspecialidad);
                });

            migrationBuilder.CreateTable(
                name: "Materias",
                columns: table => new
                {
                    CodMateria = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materias", x => x.CodMateria);
                });

            migrationBuilder.CreateTable(
                name: "Cursos",
                columns: table => new
                {
                    CodCurso = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: true),
                    Nivel = table.Column<string>(nullable: true),
                    Capacidad = table.Column<byte>(nullable: false),
                    CodEspecialidad = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cursos", x => x.CodCurso);
                    table.ForeignKey(
                        name: "FK_Cursos_Especialidades_CodEspecialidad",
                        column: x => x.CodEspecialidad,
                        principalTable: "Especialidades",
                        principalColumn: "CodEspecialidad",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EspecialidadesMaterias",
                columns: table => new
                {
                    CodEspecialidad = table.Column<int>(nullable: false),
                    CodMateria = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EspecialidadesMaterias", x => new { x.CodEspecialidad, x.CodMateria });
                    table.ForeignKey(
                        name: "FK_EspecialidadesMaterias_Especialidades_CodEspecialidad",
                        column: x => x.CodEspecialidad,
                        principalTable: "Especialidades",
                        principalColumn: "CodEspecialidad",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EspecialidadesMaterias_Materias_CodEspecialidad",
                        column: x => x.CodEspecialidad,
                        principalTable: "Materias",
                        principalColumn: "CodMateria",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Profesores",
                columns: table => new
                {
                    ProfesorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: true),
                    Apellido = table.Column<string>(nullable: true),
                    FechaDeNacimiento = table.Column<DateTime>(nullable: false),
                    NroDocumento = table.Column<int>(nullable: false),
                    Direccion = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    CodMateria = table.Column<int>(nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Alumnos",
                columns: table => new
                {
                    NroLegajo = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: true),
                    Apellido = table.Column<string>(nullable: true),
                    FechaDeNacimiento = table.Column<DateTime>(nullable: false),
                    NroDocumento = table.Column<int>(nullable: false),
                    Direccion = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    FechaDeIngreso = table.Column<DateTime>(nullable: false),
                    CodCurso = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alumnos", x => x.NroLegajo);
                    table.ForeignKey(
                        name: "FK_Alumnos_Cursos_CodCurso",
                        column: x => x.CodCurso,
                        principalTable: "Cursos",
                        principalColumn: "CodCurso",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CursosProfesores",
                columns: table => new
                {
                    CodCurso = table.Column<int>(nullable: false),
                    ProfesorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CursosProfesores", x => new { x.CodCurso, x.ProfesorId });
                    table.ForeignKey(
                        name: "FK_CursosProfesores_Cursos_CodCurso",
                        column: x => x.CodCurso,
                        principalTable: "Cursos",
                        principalColumn: "CodCurso",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CursosProfesores_Profesores_ProfesorId",
                        column: x => x.ProfesorId,
                        principalTable: "Profesores",
                        principalColumn: "ProfesorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AlumnosMaterias",
                columns: table => new
                {
                    NroLegajo = table.Column<int>(nullable: false),
                    CodMateria = table.Column<int>(nullable: false),
                    NotaPrimerTrimestre = table.Column<byte>(nullable: false),
                    NotaSegundoTrimestre = table.Column<byte>(nullable: false),
                    NotaTercerTrimestre = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlumnosMaterias", x => new { x.NroLegajo, x.CodMateria });
                    table.ForeignKey(
                        name: "FK_AlumnosMaterias_Materias_CodMateria",
                        column: x => x.CodMateria,
                        principalTable: "Materias",
                        principalColumn: "CodMateria",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AlumnosMaterias_Alumnos_NroLegajo",
                        column: x => x.NroLegajo,
                        principalTable: "Alumnos",
                        principalColumn: "NroLegajo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alumnos_CodCurso",
                table: "Alumnos",
                column: "CodCurso");

            migrationBuilder.CreateIndex(
                name: "IX_AlumnosMaterias_CodMateria",
                table: "AlumnosMaterias",
                column: "CodMateria");

            migrationBuilder.CreateIndex(
                name: "IX_Cursos_CodEspecialidad",
                table: "Cursos",
                column: "CodEspecialidad");

            migrationBuilder.CreateIndex(
                name: "IX_CursosProfesores_ProfesorId",
                table: "CursosProfesores",
                column: "ProfesorId");

            migrationBuilder.CreateIndex(
                name: "IX_Profesores_CodMateria",
                table: "Profesores",
                column: "CodMateria");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlumnosMaterias");

            migrationBuilder.DropTable(
                name: "CursosProfesores");

            migrationBuilder.DropTable(
                name: "EspecialidadesMaterias");

            migrationBuilder.DropTable(
                name: "Alumnos");

            migrationBuilder.DropTable(
                name: "Profesores");

            migrationBuilder.DropTable(
                name: "Cursos");

            migrationBuilder.DropTable(
                name: "Materias");

            migrationBuilder.DropTable(
                name: "Especialidades");
        }
    }
}
