using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Materia
    {
        [Key]
        public int CodMateria { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public float Precio { get; set; }

        [Required]
        public bool EsPromocionable { get; set; }

        public ICollection<CarreraMateria> CarrerasMaterias { get; set; }
        public ICollection<Profesor> Profesores { get; set; }
    }
}