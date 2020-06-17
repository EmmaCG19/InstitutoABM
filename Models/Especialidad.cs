using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Especialidad
    {
        [Key]
        public int CodEspecialidad { get; set; }
        public int Nombre { get; set; }
        public ICollection<EspecialidadMateria> EspecialidadMaterias { get; set; }
    }
}