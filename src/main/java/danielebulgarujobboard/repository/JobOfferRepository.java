package danielebulgarujobboard.repository;

import danielebulgarujobboard.model.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
    List<JobOffer> findByStatusOrderByCreatedAtDesc(String status);
    List<JobOffer> findByRecruiterIdOrderByCreatedAtDesc(Long recruiterId);
}
