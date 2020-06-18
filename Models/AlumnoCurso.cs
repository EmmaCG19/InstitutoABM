using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class AlumnoCurso
    {
        public int NroLegajo { get; set; }
        public Alumno Alumno { get; set; }

        public int CodCurso { get; set; }
        public Curso Curso { get; set; }

        public byte NotaPrimerParcial { get; set; }
        public byte NotaSegundoParcial { get; set; }
        public byte NotaFinal { get; set; }

        
        
    }
}