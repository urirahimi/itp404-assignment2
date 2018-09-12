let subredditsTemplateString = document.getElementById("subreddit-template").innerHTML;
let renderSubreddits = Handlebars.compile(subredditsTemplateString);

$("#search-input").on("submit", function(e) {
  e.preventDefault();
  $("#loader").css("display", "block");
  const query = $("#query").val();
  const url = `https://www.reddit.com/r/${query}.json`;

  let promise = fetch(url).then(
    response => {
      console.log(response.json());
      let promise = response.json();
      console.log("prose = " + promise);
      return promise;
    },
    err => {
      console.log("err" + err);
      $("#loader").css("display", "none");
      $("body").append("Oops! Something went wrong!");
      return;
    }
  );

  promise.then(
    subreddits => {
      const arrayOfSubreddits = subreddits.data.children;
      let arrayOfData = [];
      for (var i = 0; i < arrayOfSubreddits.length; i += 1) {
        let data = {
          title: arrayOfSubreddits[i].data.title,
          score: arrayOfSubreddits[i].data.score.toLocaleString(),
          subreddit_subscribers: arrayOfSubreddits[i].data.subreddit_subscribers.toLocaleString(),
          num_comments: arrayOfSubreddits[i].data.num_comments.toLocaleString()
        };
        arrayOfData.push(data);
      }
      const renderedSubreddits = renderSubreddits({
        subreddit: arrayOfData
      });
      $("body").append(renderedSubreddits);
      $("#loader").css("display", "none");
    },
    function(err) {
      console.log(err);
      $("#loader").css("display", "none");
      $("body").append("Oops! Something went wrong!");
    }
  );
});

// $.getJSON("https://api.github.com/users/wycats/repos").then(subreddits => {
//   console.log(subreddits);
//   let renderedRepos = renderRepos({
//     repos: repositories
//   });
//   $("body").append(renderedRepos);
// });
