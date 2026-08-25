package danielebulgarujobboard.service;

import danielebulgarujobboard.dto.ProfileRequest;
import danielebulgarujobboard.model.Profile;
import danielebulgarujobboard.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired private ProfileRepository profileRepo;

    public Profile getProfile(Long userId) {
        return profileRepo.findByUserId(userId).orElseThrow();
    }

    public Profile updateProfile(Long userId, ProfileRequest req) {
        Profile p = profileRepo.findByUserId(userId).orElseThrow();
        p.setHeadline(req.getHeadline());
        p.setSummary(req.getSummary());
        p.setLocation(req.getLocation());
        p.setYearsOfExperience(req.getYearsOfExperience());
        p.setCompanyName(req.getCompanyName());
        p.setCompanyDescription(req.getCompanyDescription());
        p.setLinkedinUrl(req.getLinkedinUrl());
        p.setPortfolioUrl(req.getPortfolioUrl());
        p.setSkills(req.getSkills());
        return profileRepo.save(p);
    }

    public void updateCv(Long userId, String cvUrl, String cvFilename) {
        Profile p = profileRepo.findByUserId(userId).orElseThrow();
        p.setCvUrl(cvUrl);
        p.setCvFilename(cvFilename);
        profileRepo.save(p);
    }
}