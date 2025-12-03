public enum EstadosMesa
{
    Disponible = 0,
    Ocupada = 1,
    Reservada = 2,
    Mantenimiento = 3
}

public class Mesa
{
    public int Id { get; set; }
    public required string Numero { get; set; }
    public int Capacidad { get; set; }
    public required string Ubicacion { get; set; }
    public EstadosMesa Estado { get; set; }
}

