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

        [Required]      
        public DateTime FechaDeNacimiento { get; set; }
        
        [Required]      
        public int NroDocumento { get; set; }
        
        public string Contacto { get; set; }

        [Required, DataType(DataType.EmailAddress)]
        public string Email { get; set; }   

    }
}