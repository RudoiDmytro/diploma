#!/usr/bin/env sh
# Downloads the rust-code-analysis-cli binary used by `make lint-metrics`.
# Linux x86_64 uses the prebuilt GitHub release; other platforms fall back to cargo.
set -eu

RCA_VERSION="${RCA_VERSION:-0.0.25}"
RCA_SHA256="${RCA_SHA256:-9ec2a217b8ff191e02dab5d5f2eee6158b63fd975c532b2c5d67c2e6c7249894}"
RCA_BIN="${RCA_BIN:-./bin/rust-code-analysis-cli}"

if [ -x "$RCA_BIN" ]; then
  exit 0
fi

mkdir -p "$(dirname "$RCA_BIN")"

arch=$(uname -m)
os=$(uname -s)

if [ "$os" = "Linux" ] && { [ "$arch" = "x86_64" ] || [ "$arch" = "amd64" ]; }; then
  tmp=$(mktemp -d)
  trap 'rm -rf "$tmp"' EXIT
  url="https://github.com/mozilla/rust-code-analysis/releases/download/v${RCA_VERSION}/rust-code-analysis-linux-cli-x86_64.tar.gz"
  printf 'install-rca: downloading rust-code-analysis-cli v%s\n' "$RCA_VERSION"
  curl -fsSL "$url" -o "$tmp/rca.tar.gz"
  printf '%s  %s\n' "$RCA_SHA256" "$tmp/rca.tar.gz" | sha256sum -c -
  tar -xzf "$tmp/rca.tar.gz" -C "$tmp"
  bin=$(find "$tmp" -type f -name 'rust-code-analysis-cli' | head -1)
  [ -n "$bin" ] || { printf 'install-rca: binary not found in tarball\n' >&2; exit 1; }
  mv "$bin" "$RCA_BIN"
  chmod +x "$RCA_BIN"
else
  printf 'install-rca: no prebuilt binary for %s/%s; building via cargo\n' "$os" "$arch" >&2
  command -v cargo >/dev/null 2>&1 || { printf 'install-rca: cargo is required on this platform\n' >&2; exit 1; }
  cargo install --locked --version "$RCA_VERSION" rust-code-analysis-cli --root "$(dirname "$(dirname "$RCA_BIN")")/.cargo-rca"
  cp "$(dirname "$(dirname "$RCA_BIN")")/.cargo-rca/bin/rust-code-analysis-cli" "$RCA_BIN"
  chmod +x "$RCA_BIN"
fi

"$RCA_BIN" --version
