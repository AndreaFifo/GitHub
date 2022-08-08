window.onload = function(){
    const searchBtn = document.getElementById('search-btn');
    const searchBar = document.getElementById('search-bar');
    let nickname = '';

    searchBtn.addEventListener('click', () => {
        if(searchBar.value != '' && searchBar.value != ' '){
            if(document.querySelector('.error'))
                document.querySelector('.error').remove();
            nickname = searchBar.value;
        
            fetch(`https://api.github.com/users/` + nickname, { cache: 'no-cache' })
                .then((response) => {
                    if(response.status === 404)
                        throw new Error('User not found.');

                    return response.json();
                })
                .then((data) => {
                    document.querySelector('.user-information').classList.remove('hidden');
                    document.getElementById('user-name').innerText = data.name;
                    document.getElementById('user-nickname').innerText = '@' + data.login;
                    document.getElementById('user-nickname').setAttribute('href', 'https://github.com/' + data.login);
                    document.querySelectorAll('img').forEach((e) => {
                        e.setAttribute('src', data.avatar_url)
                    })

                    let dateJoined = new Date(data.created_at)
                    document.getElementById('joined').innerText = "Joined " + dateJoined.getDay() + " " + dateJoined.toLocaleString('en-us', { month: 'short'}) + " " + dateJoined.getFullYear();

                    document.getElementById('bio').innerText = data.bio;
                    document.getElementById('repos').innerText = data.public_repos;
                    document.getElementById('followers').innerText = data.followers;
                    document.getElementById('following').innerText = data.following;
                    
                    document.getElementById('location').innerText = data.location == null ? 'Not available' : data.location;
                    data.location == null ? "" : document.getElementById('location').setAttribute('href', 'https://www.google.com/maps/place/' + data.location);
                    
                    document.getElementById('twitter').innerText = data.twitter == null ? 'Not available' : data.twitter;
                    data.twitter == null ? "" : document.getElementById('twitter').setAttribute('href', 'https://twitter.com/' + data.twitter);

                    document.getElementById('blog').innerText = data.blog == '' ? 'Not available' : data.blog;
                    data.blog == null ? "" : document.getElementById('blog').setAttribute('href', data.blog);

                    document.getElementById('company').innerText = data.company == null ? 'Not available' : data.company;
                })
                .catch((error) => {
                    console.log(error.message)

                    document.querySelector('.user-information').classList.add('hidden');

                    const errorDiv = document.createElement('div');
                    errorDiv.classList.add('error');
                    errorDiv.innerText = 'User not found!';
                    document.querySelector('main').append(errorDiv);
                })
        } 
    })
}