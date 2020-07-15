using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IntranetInstituto.Migrations
{
    public partial class InscripcionFinalNull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "NotaFinal",
                table: "Inscripciones",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FechaFinal",
                table: "Inscripciones",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "NotaFinal",
                table: "Inscripciones",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(byte),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "FechaFinal",
                table: "Inscripciones",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);
        }
    }
}
