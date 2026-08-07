package danielebulgarujobboard.dto;

public class JwtResponse {
    private String token;
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;

    public JwtResponse(String token, Long id, String email, String firstName, String lastName, String role) {
        this.token = token; this.id = id; this.email = email;
        this.firstName = firstName; this.lastName = lastName; this.role = role;
    }
    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getRole() { return role; }
}
