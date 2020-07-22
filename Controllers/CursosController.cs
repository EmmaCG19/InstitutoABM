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
    public class CursosController : ControllerBase
    {
        private readonly InstitutoDBContext _context;

        public CursosController(InstitutoDBContext context)
        {
            _context = context;
        }

        // GET: api/Cursos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursos()
        {
            return await _context.Cursos.Include(c => c.Profesor)
                                            .ThenInclude(p => p.Materia)
                                        .ToListAsync();
        }

        // GET: api/Cursos/5
        [HttpGet("{codCurso}")]
        public async Task<ActionResult<Curso>> GetCurso(int codCurso)
        {
            var curso = await _context.Cursos.FindAsync(codCurso);

            if (curso == null)
            {
                return NotFound();
            }

            return curso;
        }

        // PUT: api/Cursos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{codCurso}")]
        public async Task<IActionResult> PutCurso(int codCurso, Curso curso)
        {
            if (!ModelState.IsValid || codCurso != curso.CodCurso)
            {
                return BadRequest();
            }

            _context.Entry(curso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CursoExists(codCurso))
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

        // POST: api/Cursos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Curso>> PostCurso(Curso curso)
        {
            _context.Cursos.Add(curso);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCurso", new { codCurso = curso.CodCurso }, curso);
        }

        // DELETE: api/Cursos/5
        [HttpDelete("{codCurso}")]
        public async Task<ActionResult<Curso>> DeleteCurso(int codCurso)
        {
            var curso = await _context.Cursos.FindAsync(codCurso);
            if (curso == null)
            {
                return NotFound();
            }

            _context.Cursos.Remove(curso);
            await _context.SaveChangesAsync();

            return curso;
        }

        
        //Retornar los alumnos que estan inscriptos a un curso
        [HttpGet, Route("{codCurso:int}/alumnos")]
        public async Task<ActionResult<ICollection<Alumno>>> GetAlumnosPorCurso(int codCurso)
        {
            return await _context.Inscripciones
                                                .Include(i => i.Alumno)
                                                .Where(i => i.CodCurso == codCurso)
                                                .Select(i => i.Alumno)
                                                .ToListAsync<Alumno>();

        }

        //Obtener la materia que se dicta en ese curso
        [HttpGet, Route("{codCurso:int}/materia")]
        public async Task<ActionResult<Materia>> ObtenerMateria(int codCurso){

             return await _context.Cursos
                                        .Include(i => i.Profesor)
                                            .ThenInclude(p => p.Materia)
                                        .Where(i => i.CodCurso == codCurso)
                                        .Select(i => i.Profesor.Materia)
                                        .FirstOrDefaultAsync<Materia>();
        }


        
        private bool CursoExists(int codCurso)
        {
            return _context.Cursos.Any(e => e.CodCurso == codCurso);
        }
    }
}


/*
Rutas:
    GET: api/cursos
    GET: api/cursos/{codCurso}
    GET: api/cursos/{codCurso}/alumnos
    PUT: api/cursos/{codCurso}
    GET: api/carrera/{codCarrera}/cursos
    GET: api/profesor/{codProfesor}/cursos
    POST: api/cursos
    DELETE: api/cursos
*/