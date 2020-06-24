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
    public class AlumnosController : ControllerBase
    {
        private readonly InstitutoDBContext _context;

        public AlumnosController(InstitutoDBContext context)
        {
            _context = context;
        }

        // GET: api/Alumnos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alumno>>> GetAlumnos()
        {
            return await _context.Alumnos.ToListAsync();
        }

        // GET: api/Alumnos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Alumno>> GetAlumno(int id)
        {
            var alumno = await _context.Alumnos.FindAsync(id);

            if (alumno == null)
            {
                return NotFound();
            }

            return alumno;
        }

        // PUT: api/Alumnos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlumno(int id, Alumno alumno)
        {
            if (id != alumno.NroLegajo || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(alumno).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlumnoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Alumnos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Alumno>> PostAlumno(Alumno alumno)
        {
            _context.Alumnos.Add(alumno);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlumno", new { id = alumno.NroLegajo }, alumno);
        }

        // DELETE: api/Alumnos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Alumno>> DeleteAlumno(int id)
        {
            var alumno = await _context.Alumnos.FindAsync(id);
            if (alumno == null)
            {
                return NotFound();
            }

            _context.Alumnos.Remove(alumno);
            await _context.SaveChangesAsync();

            return alumno;
        }

        // [HttpGet, Route("{id:int}/materias")]
        // public async Task<ActionResult<IEnumerable<Materia>>> ObtenerMateriasCursadas(int id)
        // {
        //     //Para que un alumno curse una materia tiene que estar en un curso
        //     return await _context.Cursos.Include("Materia")
        //                                         .Where(c => c.NroLegajo == id)
        //                                         .Select(c => c.Materia)
        //                                         .ToListAsync();

        //     // // if(materias.Count != 0)
        //     //     return Ok(materias);
        //     // // else
        //     // //     return NotFound();

        // }

        [HttpGet, Route("{id:int}/materias")]
        public IActionResult ObtenerMateriasInscriptas(int id)
        {
            //Para que un alumno curse una materia tiene que estar en un curso
            var materiasInscriptas = _context.Inscripciones.Include("Materia")
                                                .Where(c => c.NroLegajo == id)
                                                .Select(c => c.Materia)
                                                .ToList<Materia>();

            return Ok(materiasInscriptas);

        }

        private bool AlumnoExists(int id)
        {
            return _context.Alumnos.Any(e => e.NroLegajo == id);
        }


    }
}
