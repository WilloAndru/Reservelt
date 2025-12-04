public enum RolesUsuario
{
    Cliente,
    Admin
}

public class Usuario
{
    public int Id { get; set; }
    public required string FirebaseUid { get; set; }
    public required string Nombre { get; set; }
    public required string Apellido { get; set; }
    public required string Email { get; set; }
    public RolesUsuario Rol { get; set; }
    public required bool Estado { get; set; } = true;
    public required DateTime FechaRegistro { get; set; } = DateTime.Now;
}

