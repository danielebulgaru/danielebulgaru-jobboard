package danielebulgarujobboard.controller;

import danielebulgarujobboard.dto.MessageResponse;
import danielebulgarujobboard.dto.ProfileRequest;
import danielebulgarujobboard.model.Profile;
import danielebulgarujobboard.service.CloudinaryService;
import danielebulgarujobboard.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {
    @Autowired private ProfileService profileService;
    @Autowired private CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<Profile> getProfile(@RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(profileService.getProfile(userId));
    }

    @PutMapping
    public ResponseEntity<Profile> updateProfile(@RequestBody ProfileRequest req,
                                                 @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(profileService.updateProfile(userId, req));
    }

    @PostMapping("/cv")
    public ResponseEntity<MessageResponse> uploadCv(@RequestParam("file") MultipartFile file,
                                                    @RequestAttribute("userId") Long userId) throws Exception {
        String url = cloudinaryService.uploadFile(file);
        profileService.updateCv(userId, url, file.getOriginalFilename());
        return ResponseEntity.ok(new MessageResponse("CV caricato!"));
    }
}
