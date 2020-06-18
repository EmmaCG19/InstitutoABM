using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntranetInstituto.Models
{
    public class Persona
    {
        [Required]
        public string Nombre { get; set; }  

        [Required]      
        public string Apellido { get; set; }

        public DateTime FechaDeNacimiento { get; set; }
        public int NroDocumento { get; set; }
        
        [Required]
        public string Contacto { get; set; }

        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }   

    }
}