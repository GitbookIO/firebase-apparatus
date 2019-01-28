workflow "Tests" {
  on = "push"
  resolves = ["Build", "Lint", "Flow"]
}

action "Build" {
  uses = "nuxt/actions-yarn"
  args = "install"
}

action "Unit Tests" {
  needs = "Build"
  uses = "nuxt/actions-yarn"
  args = "test"
}

action "Lint" {
  uses = "nuxt/actions-yarn"
  args = "test:lint"
}

action "Flow" {
  uses = "nuxt/actions-yarn"
  args = "test:flow"
}