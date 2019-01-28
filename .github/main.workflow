workflow "Tests" {
  on = "push"
  resolves = ["Unit Tests", "Lint", "Flow"]
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "install --frozen-lockfile"
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