package com.ssafy.dancy.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Builder
@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor
public class ArticleLike {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long articleLikeId;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    private Article article;

    @PrePersist
    private void preMakingArticleLike() {
        this.article.setArticleLike(this.article.getArticleLike() + 1);
    }

    @PreRemove
    private void preRemovingArticleLike() {
        this.article.setArticleLike(this.article.getArticleLike() - 1);
    }
}
