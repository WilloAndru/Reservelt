public enum RoleUser
{
    Client,
    Admin
}

public class User
{
    public int Id { get; set; }
    public required string FirebaseUid { get; set; }
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string PhotoUrl { get; set; }
    public RoleUser Role { get; set; }
    public required bool State { get; set; } = true;
    public required DateTime registerSDate { get; set; } = DateTime.Now;
}

