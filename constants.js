export const constants = Object.freeze({
    ALIBRATE : {
        CDN : "https://cdn.alibrate.com/",
        USER : {
            //WS - REST AUTH
            AUTH : "https://api.alibrate.com/v1/auth/local",
            //WS - REST PASSWORD
            REST_PASSWORD : "https://api.alibrate.com/v1/user/reset/resetPasswordRequest",
            REST_PASSWORD_TOKEN : "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJpZCI6ImNvbXBsZXRhcj8ifSwidXNlciI6Il9iYWNrZW5kIiwic2NvcGUiOiJhbGlicmF0ZSIsInJvbGVzIjpbImJhY2tlbmQiLCJhZG1pbiJdLCJwZXJtaXNzaW9ucyI6WyJnZXQgL3YxL3VzZXIvcmVzZXQvKiIsInBvc3QgL3YxL3VzZXIvcmVzZXQvcGFzcyIsInBvc3QgL3YxL3VzZXIvcmVzZXQvcmVzZXRQYXNzd29yZFJlcXVlc3QiLCJwb3N0IC92MS91c2VyL2FjdGl2YXRlIiwiZ2V0IC92MS9ib29rcy8qIiwiZ2V0IC92MS9yYW5raW5ncy8qIiwiZ2V0IC92MS9saXN0cyoiLCJnZXQgL3YxL2hvbWUtbGlzdCIsImdldCAvdjEvc29jaWFsL3B1YmxpYy93aG9SZWFkc1RoaXNCb29rLyoiLCJnZXQgL3YxL3NvY2lhbC9wdWJsaWMvcHVibGljYXRpb24vKiIsImdldCAvdjEvc29jaWFsL3dob1JlYWRzVGhpc0Jvb2svKiIsImdldCAvdjEvcmV2aWV3cy9wdWJsaWMvYm9vay8qIiwiZ2V0IC92MS9icm93c2VyIiwiZ2V0IC92MS9saWJyYXJ5L3VzZXIvKiIsImdldCAvdjEvYXV0aG9yLyoiLCJnZXQgL3YxL2Vjb21tZXJjZS9vcmRlckNhbGxiYWNrIiwiZ2V0IC92MS9lY29tbWVyY2UvYm9vay8qL3ByZXZpZXciLCJwb3N0IC92MS9ldmVudHMiLCJwb3N0IC92MS91c2VyIiwicG9zdCAvdjEvYXV0aC9sb2NhbCIsImdldCAvdjEvcmVkaXJlY3RzLyoiLCJnZXQgL3YxL3JlY29tbWVuZGF0aW9ucy90b3BCb29rc0J5QXV0aG9yIiwiZ2V0IC92MS9yZWNvbW1lbmRhdGlvbnMvdG9wQm9va3NCeUdlbnJlIiwiZ2V0IC92MS9lY29tbWVyY2UvYm9vay8qL3ByaWNlcyIsImdldCAvdjEvZ2VvL2xvY2F0aW9uIiwiZ2V0IC92MS9lY29tbWVyY2UvZ2V0T2ZmZXJzIiwiZ2V0IC92MS9lY29tbWVyY2UvZ2V0U3RvcmVOZXdzIiwiZ2V0IC92MS9lY29tbWVyY2UvYmFubmVyIiwiZ2V0IC92MS9lY29tbWVyY2Uvc2VhcmNoIiwiZ2V0IC92MS9ib29rcy9zdG9yZXMiLCJwb3N0IC92MS9hZG1pbi9taWdyYXRlQm9vayIsInBvc3QgL3YxL2NvbnRhY3QiLCJnZXQgL3YxL2Jvb2tzIiwiZ2V0IC92MS9lY29tbWVyY2UvZnJlZUJvb2tzIiwiZ2V0IC92MS9ib29rcy8qL2ZpbGVzL2FjdGl2ZSJdLCJwcm92aWRlciI6ImxvY2FsIiwiaWF0IjoxNTY1NDU2OTQzLCJleHAiOjE4ODEwMzI5NDMsImF1ZCI6ImFsaWJyYXRlIn0.WTPxO4xB47VVO0YY92S4RxX-SFqh1uDu8KA6PfDmRd3JU-miyBQqOTDPnq_XN4h8d0UB14DsAVTztHPrczHMpaDD5nb5OQCg6MHUqDipgvRoHARJMGX4y7m4lY6mWT6cdwEmRBrmuYcGhDMZMywlgdELjgGhdyd8M7yCeT3Z4nPvG7LS79r4OxrSagCcRtdROVQ60cMOYpsipZ296RCNRCt4mJT_6cxbxAKn7jv1__-XYQAeVDK4t5nYco0rcOpfxE06vIPalup6AqRp_7zYBBreADLC_UsaNgfNZSDSGOR9MFZQqwsjAg2uo0ME1eGV5j0bvLxA7SNtgsXP7deNVg",
        },
        RANKINGS : {
            //Generos
            BOOKS_GENRES : { 
                url : "https://api.alibrate.com/v1/books/genres",
                method : "GET",
                params : {
                    page : "1",
                    limit : "100"
                }
            },
            //Positions 
            POSITIONS : { 
                url : "https://api.alibrate.com/v1/rankings/positions",
                method : "GET",
                params : {
                    byScore : "true"
                }
            },
            // Los que más reseñan
            TOP_REVIEWERS : { 
                classModal : "topReviewers",
                modalName : "Los que más reseñan",
                url : "https://api.alibrate.com/v1/rankings/topReviewers",
                method : "GET",
                params : {
                    page : "1",
                    limit : "3"
                }
            },
            // Mejores reseñadores
            TOP_MORE_LIKES_IN_REVIEWS : { 
                classModal : "topMoreLikesInReviews",
                modalName : "Mejores reseñadores",
                url : "https://api.alibrate.com/v1/rankings/topMoreLikesInReviews",
                method : "GET",
                params : {
                    byScore : "true",
                    limit : "3",
                    page : "1"
                }
            },
            // Libros más leídos
            TOP_BOOK_READED_IN_LIBRARIES : { 
                classModal : "topBookReadedInLibraries",
                modalName : "Libros más leídos",
                url : "https://api.alibrate.com/v1/rankings/topBookReadedInLibraries",
                method : "GET",
                params : {
                    limit : "3",
                    page : "1"
                }
            },
            //Lectores con más seguidores
            TOP_MORE_FOLLOWED : { 
                classModal : "topMoreFollowed",
                modalName : "Lectores con más seguidores",
                url : "https://api.alibrate.com/v1/rankings/topMoreFollowed",
                method : "GET",
                params : {
                    limit : "3",
                    page : "1"
                }
            },
            //Lectores con mejores citas
            TOP_MORE_LIKES_IN_QUOTES : { 
                classModal : "topMoreLikesInQuotes",
                modalName : "Lectores con mejores citas",
                url : "https://api.alibrate.com/v1/rankings/topMoreLikesInQuotes",
                method : "GET",
                params : {
                    byScore : "true",
                    limit : "3",
                    page : "1"
                }
            },
            // Lectores con mejores listas
            TOP_MORE_LIKES_IN_LISTS : { 
                classModal : "topMoreLikesInLists",
                modalName : "Lectores con mejores listas",
                url : "https://api.alibrate.com/v1/rankings/topMoreLikesInLists",
                method : "GET",
                params : {
                    byScore : "true",
                    limit : "3",
                    page : "1"
                }
            },
            //Lectores con mejores imágenes
            TOP_MORE_LIKES_IN_IMAGES : { 
                classModal : "topMoreLikesInImages",
                modalName : "Lectores con mejores imágenes",
                url : "https://api.alibrate.com/v1/rankings/topMoreLikesInImages",
                method : "GET",
                params : {
                    byScore : "true",
                    limit : "3",
                    page : "1"
                }
            },
            //Lectores con mejores textos
            TOP_MORE_LIKES_IN_TEXTS : { 
                classModal : "topMoreLikesInTexts",
                modalName : "Lectores con mejores textos",
                url : "https://api.alibrate.com/v1/rankings/topMoreLikesInTexts",
                method : "GET",
                params : {
                    byScore : "true",
                    limit : "3",
                    page : "1"
                }
            },           
        }
    }
});