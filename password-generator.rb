class PasswordGenerator < Formula
  desc "A simple password generator"
  homepage "https://github.com/COSIMOv03/password-generator"
  url "https://github.com/COSIMOv03/password-generator/archive/v1.0.tar.gz"
  sha256 "d6b2b8f62b8f12817e5fb4d59c96f801c982622dbfc437469295f0c31a9ac5fb"  # Replace with actual sha256 of the tar.gz file

  # Xcode Command Line Tools should be installed by default on macOS, but we can ensure it by specifying dependency.
  depends_on :xcode

  def install
    # Compiling the C++ source code to generate the executable
    system "g++", "password_generator.cpp", "-o", "password_generator"

    # Install the compiled binary into the bin directory
    bin.install "password_generator"
  end

  test do
    # Basic test to verify the installation
    system "#{bin}/password_generator", "--help"
  end
end
