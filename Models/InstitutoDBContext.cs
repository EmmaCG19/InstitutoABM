using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IntranetInstituto.Models
{
    public partial class InstitutoDBContext : DbContext
    {
        public DbSet<Alumno> Alumnos { get; set; }    
        public DbSet<Materia> Materias { get; set; }    
        public DbSet<Curso> Cursos { get; set; }    
        public DbSet<Profesor> Profesores { get; set; }    
        public DbSet<Carrera> Carreras {get;set;}
        public DbSet<CarreraMateria> CarrerasMaterias {get;set;}
        public DbSet<AlumnoCurso> AlumnosCursos {get;set;}

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

            modelBuilder.Entity<AlumnoCurso>().HasKey(ac => new{ac.NroLegajo, ac.CodCurso});
            //Definir las foreign keys

            modelBuilder.Entity<AlumnoCurso>()
            .HasOne<Alumno>(ac => ac.Alumno)    //Refiere a la propiedad de navegacion de referencia 
            .WithMany(a => a.AlumnosCursos)    //Refiere a la propiedad de navegacion de coleccion 
            .HasForeignKey(ac => ac.NroLegajo); //Refiere a la propiedad definida como FK en la entidad

            modelBuilder.Entity<AlumnoCurso>()
            .HasOne<Curso>(ac => ac.Curso)
            .WithMany(m => m.AlumnosCursos)
            .HasForeignKey(ac => ac.CodCurso);    

            
            modelBuilder.Entity<CarreraMateria>().HasKey(cm => new{cm.CodCarrera, cm.CodMateria});

            modelBuilder.Entity<CarreraMateria>()
            .HasOne<Carrera>(cm => cm.Carrera)   
            .WithMany(c => c.CarrerasMaterias)    
            .HasForeignKey(cm => cm.CodCarrera); 

            modelBuilder.Entity<CarreraMateria>()
            .HasOne<Materia>(cm => cm.Materia)
            .WithMany(m => m.CarrerasMaterias)
            .HasForeignKey(cm => cm.CodMateria);    

            //Error al agregar la FK constraint en Alumnos con Data Annotations
            modelBuilder.Entity<Alumno>()
            .HasOne<Carrera>(a => a.Carrera)
            .WithMany(c => c.Alumnos)
            .HasForeignKey(a => a.CodCarrera);
           
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
