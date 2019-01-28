workflow "Tests" {
  on = "push"
  resolves = ["Build", "Lint", "Flow"]
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Unit Tests" {
  needs = "Build"
  uses = "nuxt/actions-yarn@master"
  args = "test"
}

action "Lint" {
  uses = "nuxt/actions-yarn@master"
  args = "test:lint"
}

action "Flow" {
  uses = "nuxt/actions-yarn@master"
  args = "test:flow"
}