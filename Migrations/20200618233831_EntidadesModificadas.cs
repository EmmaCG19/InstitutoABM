using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IntranetInstituto.Migrations
{
    public partial class EntidadesModificadas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alumnos_Cursos_CodCurso",
                table: "Alumnos");

            migrationBuilder.DropForeignKey(
                name: "FK_Cursos_Especialidades_CodEspecialidad",
                table: "Cursos");

            migrationBuilder.DropTable(
                name: "AlumnosMaterias");

            migrationBuilder.DropTable(
                name: "CursosProfesores");

            migrationBuilder.DropTable(
                name: "EspecialidadesMaterias");

            migrationBuilder.DropTable(
                name: "Especialidades");

            migrationBuilder.DropIndex(
                name: "IX_Cursos_CodEspecialidad",
                table: "Cursos");

            migrationBuilder.DropIndex(
                name: "IX_Alumnos_CodCurso",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "Direccion",
                table: "Profesores");

            migrationBuilder.DropColumn(
                name: "Capacidad",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "CodEspecialidad",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "Nivel",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "Nombre",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "CodCurso",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "Direccion",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "FechaDeIngreso",
                table: "Alumnos");

            migrationBuilder.AddColumn<string>(
                name: "Contacto",
                table: "Profesores",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaInicio",
                table: "Cursos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ProfesorId",
                table: "Cursos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CodCarrera",
                table: "Alumnos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Contacto",
                table: "Alumnos",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaIngreso",
                table: "Alumnos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "AlumnosCursos",
                columns: table => new
                {
                    NroLegajo = table.Column<int>(nullable: false),
                    CodCurso = table.Column<int>(nullable: false),
                    NotaPrimerParcial = table.Column<byte>(nullable: false),
                    NotaSegundoParcial = table.Column<byte>(nullable: false),
                    NotaFinal = table.Column<byte>(nullable: false)
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
                name: "Carreras",
                columns: table => new
                {
                    CodCarrera = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carreras", x => x.CodCarrera);
                });

            migrationBuilder.CreateTable(
                name: "CarrerasMaterias",
                columns: table => new
                {
                    CodCarrera = table.Column<int>(nullable: false),
                    CodMateria = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarrerasMaterias", x => new { x.CodCarrera, x.CodMateria });
                    table.ForeignKey(
                        name: "FK_CarrerasMaterias_Carreras_CodCarrera",
                        column: x => x.CodCarrera,
                        principalTable: "Carreras",
                        principalColumn: "CodCarrera",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarrerasMaterias_Materias_CodMateria",
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
                name: "IX_Alumnos_CodCarrera",
                table: "Alumnos",
                column: "CodCarrera");

            migrationBuilder.CreateIndex(
                name: "IX_AlumnosCursos_CodCurso",
                table: "AlumnosCursos",
                column: "CodCurso");

            migrationBuilder.CreateIndex(
                name: "IX_CarrerasMaterias_CodMateria",
                table: "CarrerasMaterias",
                column: "CodMateria");

            migrationBuilder.AddForeignKey(
                name: "FK_Alumnos_Carreras_CodCarrera",
                table: "Alumnos",
                column: "CodCarrera",
                principalTable: "Carreras",
                principalColumn: "CodCarrera",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cursos_Profesores_ProfesorId",
                table: "Cursos",
                column: "ProfesorId",
                principalTable: "Profesores",
                principalColumn: "ProfesorId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alumnos_Carreras_CodCarrera",
                table: "Alumnos");

            migrationBuilder.DropForeignKey(
                name: "FK_Cursos_Profesores_ProfesorId",
                table: "Cursos");

            migrationBuilder.DropTable(
                name: "AlumnosCursos");

            migrationBuilder.DropTable(
                name: "CarrerasMaterias");

            migrationBuilder.DropTable(
                name: "Carreras");

            migrationBuilder.DropIndex(
                name: "IX_Cursos_ProfesorId",
                table: "Cursos");

            migrationBuilder.DropIndex(
                name: "IX_Alumnos_CodCarrera",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "Contacto",
                table: "Profesores");

            migrationBuilder.DropColumn(
                name: "FechaInicio",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "ProfesorId",
                table: "Cursos");

            migrationBuilder.DropColumn(
                name: "CodCarrera",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "Contacto",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "FechaIngreso",
                table: "Alumnos");

            migrationBuilder.AddColumn<string>(
                name: "Direccion",
                table: "Profesores",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "Capacidad",
                table: "Cursos",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<int>(
                name: "CodEspecialidad",
                table: "Cursos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<byte>(
                name: "Nivel",
                table: "Cursos",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<string>(
                name: "Nombre",
                table: "Cursos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CodCurso",
                table: "Alumnos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Direccion",
                table: "Alumnos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaDeIngreso",
                table: "Alumnos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "AlumnosMaterias",
                columns: table => new
                {
                    NroLegajo = table.Column<int>(type: "int", nullable: false),
                    CodMateria = table.Column<int>(type: "int", nullable: false),
                    NotaPrimerTrimestre = table.Column<byte>(type: "tinyint", nullable: false),
                    NotaSegundoTrimestre = table.Column<byte>(type: "tinyint", nullable: false),
                    NotaTercerTrimestre = table.Column<byte>(type: "tinyint", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "CursosProfesores",
                columns: table => new
                {
                    CodCurso = table.Column<int>(type: "int", nullable: false),
                    ProfesorId = table.Column<int>(type: "int", nullable: false)
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
                name: "Especialidades",
                columns: table => new
                {
                    CodEspecialidad = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Especialidades", x => x.CodEspecialidad);
                });

            migrationBuilder.CreateTable(
                name: "EspecialidadesMaterias",
                columns: table => new
                {
                    CodEspecialidad = table.Column<int>(type: "int", nullable: false),
                    CodMateria = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_Cursos_CodEspecialidad",
                table: "Cursos",
                column: "CodEspecialidad");

            migrationBuilder.CreateIndex(
                name: "IX_Alumnos_CodCurso",
                table: "Alumnos",
                column: "CodCurso");

            migrationBuilder.CreateIndex(
                name: "IX_AlumnosMaterias_CodMateria",
                table: "AlumnosMaterias",
                column: "CodMateria");

            migrationBuilder.CreateIndex(
                name: "IX_CursosProfesores_ProfesorId",
                table: "CursosProfesores",
                column: "ProfesorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Alumnos_Cursos_CodCurso",
                table: "Alumnos",
                column: "CodCurso",
                principalTable: "Cursos",
                principalColumn: "CodCurso",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Cursos_Especialidades_CodEspecialidad",
                table: "Cursos",
                column: "CodEspecialidad",
                principalTable: "Especialidades",
                principalColumn: "CodEspecialidad",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
