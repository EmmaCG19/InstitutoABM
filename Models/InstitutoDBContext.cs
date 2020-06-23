using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IntranetInstituto.Models
{
    public partial class InstitutoDBContext : DbContext
    {
        public DbSet<Alumno> Alumnos { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<Inscripcion> Inscripciones { get; set; }
        public DbSet<Carrera> Carreras { get; set; }
        public DbSet<CarreraMateria> CarrerasMaterias { get; set; }

        public InstitutoDBContext()
        {
        }

        public InstitutoDBContext(DbContextOptions<InstitutoDBContext> options)
            : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // if (!optionsBuilder.IsConfigured)
            // {
            //Pasar el ConnectionString al appsettings
            // optionsBuilder.UseSqlServer("Server=localhost\\SQLExpress;Database=InstitutoDB;trusted_connection=true");
            // }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);

             //Error al agregar la FK constraint en Alumnos con Data Annotations
            modelBuilder.Entity<Alumno>()
            .HasOne<Carrera>(a => a.Carrera)
            .WithMany(i => i.Alumnos)
            .HasForeignKey(a => a.CodCarrera);


            //CARRERAS-MATERIAS
            modelBuilder.Entity<CarreraMateria>().HasKey(cm => new { cm.CodCarrera, cm.CodMateria });

            modelBuilder.Entity<CarreraMateria>()
            .HasOne<Carrera>(cm => cm.Carrera)
            .WithMany(i => i.CarrerasMaterias)
            .HasForeignKey(cm => cm.CodCarrera);

            modelBuilder.Entity<CarreraMateria>()
            .HasOne<Materia>(cm => cm.Materia)
            .WithMany(m => m.CarrerasMaterias)
            .HasForeignKey(cm => cm.CodMateria);


            //CURSOS
            modelBuilder.Entity<Inscripcion>().HasKey(i => new{ i.NroLegajo, i.CodMateria});

            modelBuilder.Entity<Inscripcion>()
            .HasOne<Alumno>(i => i.Alumno)
            .WithMany(a => a.Inscripciones)
            .HasForeignKey(i => i.NroLegajo);

            modelBuilder.Entity<Inscripcion>()
            .HasOne<Materia>(i => i.Materia)
            .WithMany(m => m.Inscripciones)
            .HasForeignKey(i => i.CodMateria);

        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
