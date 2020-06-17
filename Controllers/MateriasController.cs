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
    public class MateriasController : ControllerBase
    {
        private readonly InstitutoDBContext _context;

        public MateriasController(InstitutoDBContext context)
        {
            _context = context;
        }

        // GET: api/Materias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Materia>>> GetMaterias()
        {
            return await _context.Materias.ToListAsync();
        }

        // GET: api/Materias/5
        [HttpGet("{codMateria:int:min(1)}")]
        public async Task<ActionResult<Materia>> GetMateria(int codMateria)
        {
            var materia = await _context.Materias.FindAsync(codMateria);

            if (materia == null)
            {
                return NotFound();
            }

            return materia;
        }

        // PUT: api/Materias/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{codMateria:int:min(1)}")]
        public async Task<IActionResult> PutMateria(int codMateria, Materia materia)
        {
            if (codMateria != materia.CodMateria)
            {
                return BadRequest();
            }

            _context.Entry(materia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MateriaExists(codMateria))
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

        // POST: api/Materias
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Materia>> PostMateria(Materia materia)
        {
            _context.Materias.Add(materia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMateria", new { codMateria = materia.CodMateria }, materia);
        }

        // DELETE: api/Materias/5
        [HttpDelete("{codMateria:int:min(1)}")]
        public async Task<ActionResult<Materia>> DeleteMateria(int codMateria)
        {
            var materia = await _context.Materias.FindAsync(codMateria);
            if (materia == null)
            {
                return NotFound();
            }

            _context.Materias.Remove(materia);
            await _context.SaveChangesAsync();

            return materia;
        }

        private bool MateriaExists(int codMateria)
        {
            return _context.Materias.Any(e => e.CodMateria == codMateria);
        }
    }
}
