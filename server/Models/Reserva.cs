public enum EstadosReserva
{
    Pendiente,
    Confirmada,
    Cancelada,
    Completada
}

public class Reserva
{
    public int Id { get; set; }
    public required string UsuarioFirebaseUid { get; set; }
    public int MesaId { get; set; }
    public DateTime FechaReserva { get; set; }
    public int CantidadPersonas { get; set; }
    public EstadosReserva Estado { get; set; }
}
