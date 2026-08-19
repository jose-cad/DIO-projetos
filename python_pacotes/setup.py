from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as f:
    page_description = f.read()

with open("requirements.txt") as f:
    requirements = f.read().splitlines()

setup(
    name="jj-image-processing-vf",
    version="0.0.1",
    author="Jose Silva",
    author_email="jota4wd@gmail.com",
    description="processamento de imagens",
    long_description=page_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Jota4wd",
    packages=find_packages(),
    install_requires=requirements,
    python_requires='>=3.8',
)
