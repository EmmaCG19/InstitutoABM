using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace IntranetInstituto.Models
{
    public class AlumnoMateria
    {
        public int NroLegajo { get; set; }
        public int CodMateria { get; set; }

        [Range(1, 10)]
        public byte NotaPrimerTrimestre { get; set; }

        [Range(1, 10)]
        public byte NotaSegundoTrimestre { get; set; }

        [Range(1, 10)]
        public byte NotaTercerTrimestre { get; set; }
        public Alumno Alumno { get; set; }
        public Materia Materia { get; set; }
    }
}