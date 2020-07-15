using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IntranetInstituto.Migrations
{
    public partial class ProfesorCursoAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inscripciones_Materias_CodMateria",
                table: "Inscripciones");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Inscripciones",
                table: "Inscripciones");

            migrationBuilder.DropIndex(
                name: "IX_Inscripciones_CodMateria",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "CodMateria",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "Pagado",
                table: "Inscripciones");

            migrationBuilder.AddColumn<bool>(
                name: "EsPromocionable",
                table: "Materias",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "CodCurso",
                table: "Inscripciones",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaFinal",
                table: "Inscripciones",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaPrimerParcial",
                table: "Inscripciones",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaSegundoParcial",
                table: "Inscripciones",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<byte>(
                name: "NotaFinal",
                table: "Inscripciones",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<byte>(
                name: "NotaPrimerParcial",
                table: "Inscripciones",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<byte>(
                name: "NotaSegundoParcial",
                table: "Inscripciones",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Inscripciones",
                table: "Inscripciones",
                columns: new[] { "NroLegajo", "CodCurso" });

            migrationBuilder.CreateTable(
                name: "Profesores",
                columns: table => new
                {
                    ProfesorId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(nullable: false),
                    Apellido = table.Column<string>(nullable: false),
                    FechaDeNacimiento = table.Column<DateTime>(nullable: false),
                    NroDocumento = table.Column<int>(nullable: false),
                    Contacto = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: false),
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
                name: "Cursos",
                columns: table => new
                {
                    CodCurso = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfesorId = table.Column<int>(nullable: false),
                    FechaInicio = table.Column<DateTime>(nullable: false),
                    FechaFin = table.Column<DateTime>(nullable: false),
                    Capacidad = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cursos", x => x.CodCurso);
                    table.ForeignKey(
                        name: "FK_Cursos_Profesores_ProfesorId",
                        column: x => x.ProfesorId,
                        principalTable: "Profesores",
                        principalColumn: "ProfesorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Inscripciones_CodCurso",
                table: "Inscripciones",
                column: "CodCurso");

            migrationBuilder.CreateIndex(
                name: "IX_Cursos_ProfesorId",
                table: "Cursos",
                column: "ProfesorId");

            migrationBuilder.CreateIndex(
                name: "IX_Profesores_CodMateria",
                table: "Profesores",
                column: "CodMateria");

            migrationBuilder.AddForeignKey(
                name: "FK_Inscripciones_Cursos_CodCurso",
                table: "Inscripciones",
                column: "CodCurso",
                principalTable: "Cursos",
                principalColumn: "CodCurso",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inscripciones_Cursos_CodCurso",
                table: "Inscripciones");

            migrationBuilder.DropTable(
                name: "Cursos");

            migrationBuilder.DropTable(
                name: "Profesores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Inscripciones",
                table: "Inscripciones");

            migrationBuilder.DropIndex(
                name: "IX_Inscripciones_CodCurso",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "EsPromocionable",
                table: "Materias");

            migrationBuilder.DropColumn(
                name: "CodCurso",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "FechaFinal",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "FechaPrimerParcial",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "FechaSegundoParcial",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "NotaFinal",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "NotaPrimerParcial",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "NotaSegundoParcial",
                table: "Inscripciones");

            migrationBuilder.AddColumn<int>(
                name: "CodMateria",
                table: "Inscripciones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Pagado",
                table: "Inscripciones",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Inscripciones",
                table: "Inscripciones",
                columns: new[] { "NroLegajo", "CodMateria" });

            migrationBuilder.CreateIndex(
                name: "IX_Inscripciones_CodMateria",
                table: "Inscripciones",
                column: "CodMateria");

            migrationBuilder.AddForeignKey(
                name: "FK_Inscripciones_Materias_CodMateria",
                table: "Inscripciones",
                column: "CodMateria",
                principalTable: "Materias",
                principalColumn: "CodMateria",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
