using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IntranetInstituto.Models
{
    public partial class InstitutoDBContext : DbContext
    {
        public DbSet<Alumno> Alumnos { get; set; }
        public DbSet<Profesor> Profesores { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<Carrera> Carreras { get; set; }
        public DbSet<Curso> Cursos { get; set; }
        public DbSet<Inscripcion> Inscripciones { get; set; }
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

             //FK-1:M
            modelBuilder.Entity<Alumno>()
            .HasOne<Carrera>(a => a.Carrera)
            .WithMany(c => c.Alumnos)
            .HasForeignKey(a => a.CodCarrera);

            modelBuilder.Entity<Profesor>()
            .HasOne<Materia>(p => p.Materia)
            .WithMany(m => m.Profesores)
            .HasForeignKey(p => p.CodMateria);

            modelBuilder.Entity<Curso>()
            .HasOne<Profesor>(c => c.Profesor)
            .WithMany(p => p.Cursos)
            .HasForeignKey(c => c.ProfesorId);

            //FK-M:M

            //CARRERASMATERIAS
            modelBuilder.Entity<CarreraMateria>()
            .HasKey(cm => new { cm.CodCarrera, cm.CodMateria });

            modelBuilder.Entity<CarreraMateria>()
            .HasOne<Carrera>(cm => cm.Carrera)
            .WithMany(c => c.CarrerasMaterias)
            .HasForeignKey(cm => cm.CodCarrera);

            modelBuilder.Entity<CarreraMateria>()
            .HasOne<Materia>(cm => cm.Materia)
            .WithMany(m => m.CarrerasMaterias)
            .HasForeignKey(cm => cm.CodMateria);


            //INSCRIPCIONES
            modelBuilder.Entity<Inscripcion>()
            .HasKey(i => new{ i.NroLegajo, i.CodCurso});

            modelBuilder.Entity<Inscripcion>()
            .HasOne<Alumno>(i => i.Alumno)
            .WithMany(a => a.Inscripciones)
            .HasForeignKey(i => i.NroLegajo);

            modelBuilder.Entity<Inscripcion>()
            .HasOne<Curso>(i => i.Curso)
            .WithMany(c => c.Inscripciones)
            .HasForeignKey(i => i.CodCurso);

        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
