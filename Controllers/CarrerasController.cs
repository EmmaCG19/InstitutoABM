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
    public class CarrerasController : ControllerBase
    {
        private readonly InstitutoDBContext _context;

        public CarrerasController(InstitutoDBContext context)
        {
            _context = context;
        }

        // GET: api/Carreras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carrera>>> GetCarreras()
        {
            return await _context.Carreras.ToListAsync();
        }

        // GET: api/Carreras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Carrera>> GetCarrera(int id)
        {
            var carrera = await _context.Carreras.FindAsync(id);

            if (carrera == null)
            {
                return NotFound();
            }

            return carrera;
        }

        // PUT: api/Carreras/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarrera(int id, Carrera carrera)
        {
            if (id != carrera.CodCarrera)
            {
                return BadRequest();
            }

            _context.Entry(carrera).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarreraExists(id))
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

        // POST: api/Carreras
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Carrera>> PostCarrera(Carrera carrera)
        {
            _context.Carreras.Add(carrera);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarrera", new { id = carrera.CodCarrera }, carrera);
        }

        // DELETE: api/Carreras/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Carrera>> DeleteCarrera(int id)
        {
            var carrera = await _context.Carreras.FindAsync(id);
            if (carrera == null)
            {
                return NotFound();
            }

            _context.Carreras.Remove(carrera);
            await _context.SaveChangesAsync();

            return carrera;
        }

        private bool CarreraExists(int id)
        {
            return _context.Carreras.Any(e => e.CodCarrera == id);
        }


        [HttpGet, Route("{codCarrera:int}/materias")]
        public async Task<ActionResult<IEnumerable<Materia>>> ObtenerMaterias(int codCarrera)
        {

            return await _context.CarrerasMaterias
                                                    .Include(cm => cm.Materia)
                                                    .Where(cm => cm.CodCarrera == codCarrera)
                                                    .Select(cm => cm.Materia)
                                                    .ToListAsync<Materia>();

        }


        [HttpDelete, Route("{codCarrera:int}/materias/{codMateria:int}")]
        public async Task<IActionResult> EliminarMateriaCarrera(int codCarrera, int codMateria)
        {

            var carreraMateria = await _context.CarrerasMaterias.Where(cm => cm.CodCarrera == codCarrera
                                                                && cm.CodMateria == codMateria)
                                                            .FirstOrDefaultAsync<CarreraMateria>();

            if (carreraMateria is null)
                return NotFound();

            _context.CarrerasMaterias.Remove(carreraMateria);
            await _context.SaveChangesAsync();
            return Ok(carreraMateria);
        }

        [HttpPost, Route("{codCarrera:int}/materias")]
        public async Task<IActionResult> CargarMateriaCarrera(CarreraMateria carreraMateria)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _context.CarrerasMaterias.Add(carreraMateria);
                await _context.SaveChangesAsync();
            }
            catch (System.Exception e)
            {
                return NotFound(e);
            }

            return Ok(carreraMateria);
        }
    }
}
