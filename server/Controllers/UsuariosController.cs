using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    // Importamos la estructura de la base de datos
    private readonly AppDbContext _context;
    public UsuariosController(AppDbContext context)
    {
        _context = context;
    }

    // Endpoint para crear usuario
    [HttpPost]
    public async Task<IActionResult> CrearUsuario([FromBody] UsuarioCreateDto dto)
    {
        // Si el DTO viene con errores, devolvemos 400
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Verificamos duplicado por FirebaseUid
        var existe = await _context.Usuarios
            .AnyAsync(u => u.FirebaseUid == dto.FirebaseUid);

        // Si el usuario ya existe, devolvemos 409
        if (existe)
            return Conflict(new
            {
                message = "El usuario ya está registrado en el sistema."
            });

        // Creamos la estructura del nuevo usuario
        var nuevoUsuario = new Usuario
        {
            FirebaseUid = dto.FirebaseUid,
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            Email = dto.Email,
            Rol = RolesUsuario.Cliente,    // Por defecto
            Estado = true,                  // Activo al registrarse
            FechaRegistro = DateTime.UtcNow
        };

        // Guardamos el nuevo usuario en la db
        _context.Usuarios.Add(nuevoUsuario);
        await _context.SaveChangesAsync();

        // Usamos la funcion CreatedAtAction para tener un REST apropiado
        return CreatedAtAction(
            nameof(ObtenerUsuarioPorFirebaseUid),
            new { id = nuevoUsuario.FirebaseUid },
            nuevoUsuario
        );
    }

    // Endpoint para obtener datos del usuario, ademas sirve para el REST de CrearUsuario
    [HttpGet("{uid}")]
    public async Task<IActionResult> ObtenerUsuarioPorFirebaseUid(string uid)
    {
        var usuario = await _context.Usuarios.FindAsync(uid);

        if (usuario == null)
            return NotFound();

        return Ok(usuario);
    }
}
