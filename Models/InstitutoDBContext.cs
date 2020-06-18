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
        public DbSet<Especialidad> Especialidades { get; set; }    
        public DbSet<AlumnoMateria> AlumnosMaterias { get; set; }    
        public DbSet<CursoProfesor> CursosProfesores { get; set; }    
        public DbSet<EspecialidadMateria> EspecialidadesMaterias { get; set; }    


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

            modelBuilder.Entity<AlumnoMateria>().HasKey(am => new{am.NroLegajo, am.CodMateria});
            //Definir las foreign keys

            modelBuilder.Entity<AlumnoMateria>()
            .HasOne<Alumno>(am => am.Alumno)    //Refiere a la propiedad de navegacion de referencia 
            .WithMany(a => a.AlumnoMaterias)    //Refiere a la propiedad de navegacion de coleccion 
            .HasForeignKey(am => am.NroLegajo); //Refiere a la propiedad definida como FK en la entidad

            modelBuilder.Entity<AlumnoMateria>()
            .HasOne<Materia>(am => am.Materia)
            .WithMany(m => m.AlumnoMaterias)
            .HasForeignKey(am => am.CodMateria);    

            modelBuilder.Entity<EspecialidadMateria>().HasKey(em => new{em.CodEspecialidad, em.CodMateria});                

            modelBuilder.Entity<EspecialidadMateria>()
            .HasOne<Especialidad>(em => em.Especialidad)
            .WithMany(e => e.EspecialidadMaterias)
            .HasForeignKey(em => em.CodEspecialidad);

            modelBuilder.Entity<EspecialidadMateria>()
            .HasOne<Materia>(em => em.Materia)
            .WithMany(m => m.EspecialidadMaterias)
            .HasForeignKey(em => em.CodEspecialidad);

            modelBuilder.Entity<CursoProfesor>().HasKey(cp => new{cp.CodCurso, cp.ProfesorId});      

            modelBuilder.Entity<CursoProfesor>()
            .HasOne<Curso>(cp => cp.Curso)
            .WithMany(c => c.CursoProfesores)
            .HasForeignKey(em => em.CodCurso);

            modelBuilder.Entity<CursoProfesor>()
            .HasOne<Profesor>(cp => cp.Profesor)
            .WithMany(p => p.CursoProfesores)
            .HasForeignKey(em => em.ProfesorId);          

        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
