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
        public async Task<ActionResult<ICollection<Inscripcion>>> GetInscripcionesPorAlumno(int nroLegajo)
        {
            return await _context.Inscripciones
                                                .Include(i => i.Curso)
                                                    .ThenInclude(c => c.Profesor)
                                                    .ThenInclude(p => p.Materia)
                                                .Where(i => i.NroLegajo == nroLegajo)
                                                .ToListAsync<Inscripcion>();

        }

        
        [HttpGet, Route("cursos/{codCurso:int}")]
        public async Task<ActionResult<IEnumerable<Inscripcion>>> GetInscripcionesPorCurso(int codCurso)
        {
            return await _context.Inscripciones.Where(i => i.CodCurso == codCurso)
                                               .ToListAsync<Inscripcion>();
                
        }        

        [HttpGet, Route("cursos/{codCurso:int}/alumnos/{nroLegajo:int}")]
        public async Task<IActionResult> GetInscripcion(int codCurso, int nroLegajo)
        {
            Inscripcion inscripcion = await _context.Inscripciones
                                                            .Include("Alumno")
                                                            .Include("Curso")
                                                            .Where(i => i.CodCurso == codCurso && i.NroLegajo == nroLegajo)
                                                            .FirstOrDefaultAsync<Inscripcion>();

            if(inscripcion == null)
                return NotFound();

            return Ok(inscripcion);
        }        

    }
}
