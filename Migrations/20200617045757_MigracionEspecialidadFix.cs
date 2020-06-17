using Microsoft.EntityFrameworkCore.Migrations;

namespace IntranetInstituto.Migrations
{
    public partial class MigracionEspecialidadFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Nombre",
                table: "Especialidades",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Nombre",
                table: "Especialidades",
                type: "int",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
