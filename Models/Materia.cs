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

        public ICollection<Inscripcion> Inscripciones { get; set; }
        public ICollection<CarreraMateria> CarrerasMaterias { get; set; }
    }
}