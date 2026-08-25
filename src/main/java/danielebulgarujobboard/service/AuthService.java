package danielebulgarujobboard.service;

import danielebulgarujobboard.dto.*;
import danielebulgarujobboard.model.Profile;
import danielebulgarujobboard.model.User;
import danielebulgarujobboard.repository.ProfileRepository;
import danielebulgarujobboard.repository.UserRepository;
import danielebulgarujobboard.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired private AuthenticationManager authManager;
    @Autowired private UserRepository userRepo;
    @Autowired private ProfileRepository profileRepo;
    @Autowired private PasswordEncoder encoder;
    @Autowired private JwtUtils jwtUtils;
    @Autowired private JavaMailSender mailSender;

    public JwtResponse login(LoginRequest req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        User user = userRepo.findByEmail(req.getEmail()).orElseThrow();
        String token = jwtUtils.generateToken(user.getEmail(), user.getId(), user.getRole());
        return new JwtResponse(token, user.getId(), user.getEmail(),
                user.getFirstName(), user.getLastName(), user.getRole());
    }

    public MessageResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            return new MessageResponse("Email gia registrata!");
        }
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setPhone(req.getPhone());
        user.setRole(req.getRole());
        User saved = userRepo.save(user);

        Profile profile = new Profile();
        profile.setUser(saved);
        if ("RECRUITER".equals(req.getRole())) {
            profile.setCompanyName(req.getCompanyName());
        } else {
            profile.setHeadline(req.getHeadline());
        }
        profileRepo.save(profile);

        sendEmail(saved.getEmail(), "Benvenuto su JobBoard",
                "Ciao " + saved.getFirstName() + ", benvenuto!");
        return new MessageResponse("Registrazione completata!");
    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to); msg.setSubject(subject); msg.setText(text);
        try { mailSender.send(msg); } catch (Exception e) { e.printStackTrace(); }
    }
}
