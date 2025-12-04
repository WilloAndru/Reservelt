// Datos a manejar cuando se crea un usuario
public class UsuarioCreateDto
{
    public required string FirebaseUid { get; set; }
    public required string Nombre { get; set; }
    public required string Apellido { get; set; }
    public required string Email { get; set; }
}