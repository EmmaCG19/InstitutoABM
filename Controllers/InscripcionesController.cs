using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntranetInstituto.Models;

namespace IntranetInstituto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InscripcionesController : ControllerBase
    {
        private readonly InstitutoDBContext _context;

        public InscripcionesController(InstitutoDBContext context)
        {
            _context = context;
        }

        // GET: api/Inscripciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inscripcion>>> GetInscripciones()
        {
            return await _context.Inscripciones.ToListAsync();
        }


        [HttpGet, Route("alumnos/{nroLegajo:int}")]
        public IActionResult GetInscripcionesPorAlumno(int nroLegajo)
        {
            List<Inscripcion> inscripcionesPorAlumno = _context.Inscripciones.Where(i => i.NroLegajo == nroLegajo).ToList();

            if(inscripcionesPorAlumno.Count == 0)
                return NotFound();
            
            return Ok(inscripcionesPorAlumno);
        }

        
        [HttpGet, Route("materias/{codMateria:int}")]
        public IActionResult GetInscripcionesPorMateria(int codMateria)
        {
            List<Inscripcion> inscripcionesPorMateria = _context.Inscripciones.Where(i => i.CodMateria == codMateria).ToList();

            if(inscripcionesPorMateria.Count == 0)
                return NotFound();
                
                return Ok(inscripcionesPorMateria);
            
        }        

        [HttpGet, Route("materias/{codMateria:int}/alumnos/{nroLegajo:int}")]
        public IActionResult GetInscripcion(int codMateria, int nroLegajo)
        {
            Inscripcion inscripcion = _context.Inscripciones.Where(i => i.CodMateria == codMateria && i.NroLegajo == nroLegajo)
                                                            .FirstOrDefault();

            if(inscripcion is null)
                return NotFound();
            
            return Ok(inscripcion);
        }        
        

    }
}
