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
            return await _context.Inscripciones
                                                .Include(i => i.Alumno)
                                                .Include(i => i.Curso)                                                             
                                                .ToListAsync<Inscripcion>();
        }


        [HttpGet, Route("alumnos/{nroLegajo:int}")]
        public async Task<ActionResult<IEnumerable<Inscripcion>>> GetInscripcionesPorAlumno(int nroLegajo)
        {
            return await _context.Inscripciones
                                                .Include(i => i.Curso)
                                                .Where(i => i.NroLegajo == nroLegajo)
                                                .ToListAsync<Inscripcion>();

        }

        
        [HttpGet, Route("cursos/{codCurso:int}")]
        public async Task<ActionResult<IEnumerable<Inscripcion>>> GetInscripcionesPorCurso(int codCurso)
        {
            return await _context.Inscripciones
                                                .Include(i => i.Alumno)
                                                .Where(i => i.CodCurso == codCurso)
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

        [HttpPost, Route("") ]
        public async Task<IActionResult> CargarInscripcion(Inscripcion inscripcion)
        {
            if(!ModelState.IsValid)    
                return BadRequest(ModelState);

            //Verificar si existe el nro de legajo y codCurso???

            var inscripcionDB = await _context.Inscripciones
                                                            .Where(
                                                                 i => i.CodCurso == inscripcion.CodCurso && 
                                                                      i.NroLegajo == inscripcion.NroLegajo )
                                                            .FirstOrDefaultAsync<Inscripcion>();

            if(inscripcionDB != null)
                return BadRequest("Ya existe una inscripcion cargada con ese codCurso y nroLegajo.");

            _context.Inscripciones.Add(inscripcion);    
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut, Route("cursos/{codCurso:int}/alumnos/{nroLegajo:int}") ]
        public async Task<IActionResult> ActualizarInscripcion(int codCurso, int nroLegajo, Inscripcion inscripcion)
        {
            if(!ModelState.IsValid)    
                return BadRequest(ModelState);

            if(nroLegajo != inscripcion.NroLegajo || codCurso != inscripcion.CodCurso)   
                return BadRequest("El nroLegajo o el codCurso ingresado no coincide con los datos de la inscripcion"); 

            Inscripcion inscripcionDB = await _context.Inscripciones
                                                                    .Where(i => i.NroLegajo == nroLegajo && 
                                                                                i.CodCurso == codCurso )
                                                                    .FirstOrDefaultAsync<Inscripcion>();
            
            if(inscripcionDB is null)
                return NotFound();

            //Modificar campos
            inscripcionDB.NotaPrimerParcial = inscripcion.NotaPrimerParcial;
            inscripcionDB.NotaSegundoParcial = inscripcion.NotaSegundoParcial;
            inscripcionDB.NotaFinal = inscripcion.NotaFinal;
            inscripcionDB.FechaInscripcion = inscripcion.FechaInscripcion;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete, Route("cursos/{codCurso:int}/alumnos/{nroLegajo:int}")]
        public async Task<IActionResult> DeleteInscripcion(int codCurso, int nroLegajo)
        {
            Inscripcion inscripcionDB = await _context.Inscripciones
                                                                    .Where(i => i.NroLegajo == nroLegajo && 
                                                                                i.CodCurso == codCurso )
                                                                    .FirstOrDefaultAsync<Inscripcion>();

            if(inscripcionDB is null)
                return NotFound();

            _context.Inscripciones.Remove(inscripcionDB);
            await _context.SaveChangesAsync();    

            return Ok();
        }


    }
}

/*
API ROUTES:
GET: api/inscripciones - Obtener todas las inscripciones
GET: api/inscripciones/alumnos/{nroLegajo}/cursos/{codCurso} - Obtener una inscripcion
GET: api/inscripciones/alumnos/{nroLegajo} - Obtener las inscripciones del alumno
GET: api/inscripciones/cursos/{codCurso} - Obtener las inscripciones a ese curso

PUT: api/inscripciones/alumnos/{nroLegajo}/cursos/{codCurso} - Actualizar una inscripcion
POST: api/inscripciones - Cargar una inscripcion
DELETE: api/inscripciones/alumnos/{nroLegajo}/cursos/{codCurso} - Eliminar una inscripcion

*/