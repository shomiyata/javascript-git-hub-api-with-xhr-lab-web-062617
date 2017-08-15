let userName = document.getElementById('username')
let formEl = document.getElementById('user-form')
	formEl.addEventListener('submit', function() {
		event.preventDefault()
	})

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = repos.map(r => `<li><a href="${r.html_url}">${r.name}</a> 
  	<a href="#" data_url="${r.commits_url}" onclick="getCommits(this)">
  	Get Commits</a></li> <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">
  	Get Branches</a></li>`)
  console.log(repoList)
  const repoHtml = `<ul>${repoList.join('')}</ul>`
  console.log(repoHtml)
  document.getElementById("repositories").innerHTML = repoHtml
}

function getRepositories() {
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayRepositories);
	req.open("GET", `https://api.github.com/users/${userName.value}/repos`)
	setToken(req)
	req.send()
}

function getCommits(el) {
	const repo = el.dataset.repository
	const userName = el.dataset.username/**/
	const link = `https://api.g
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayCommits)
	req.open("GET", `${link}`)
	setToken(req)
	req.send()
}

function displayCommits() {
	const commits = JSON.parse(this.responseText)
	const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + commit.author.login +'</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = commitsList
}

function displayBranches(){
	const branches = JSON.parse(this.responseText)
	const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
	document.getElementById("details").innerHTML = branchesList
}

function getBranches(el){
	const repo = el.dataset.repository
	const userName = el.dataset.username
	const link = `https://api.github.com/repos/${userName}/${repo}/branches`
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayBranches)
	req.open("GET", `${link}`)
	setToken(req)
	req.send()
}

function setToken(req){
	req.setRequestHeader("Authorization", "token 13f2f340cb8586021122c9eec042e03fba2bf638")
}