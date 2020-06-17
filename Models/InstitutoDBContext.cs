using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IntranetInstituto.Models
{
    public partial class InstitutoDBContext : DbContext
    {
        public InstitutoDBContext()
        {
        }

        public InstitutoDBContext(DbContextOptions<InstitutoDBContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //Pasar el ConnectionString al appsettings
                optionsBuilder.UseSqlServer("Server=localhost\\SQLExpress;Database=InstitutoDB;trusted_connection=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
